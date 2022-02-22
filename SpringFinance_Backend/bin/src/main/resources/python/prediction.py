from datetime import date as dt
import yfinance as yf
from fbprophet import Prophet, plot
import sys, os
from pandas import read_json
import logging, warnings

today = dt.today().strftime("%Y-%m-%d")

def load_data(ticker, start="2015-01-01", end=today):
    with suppress_stdout_stderr():
        data = yf.download(ticker, start, end)
    data.reset_index(inplace=True)
    data.to_json(os.path.join("raw", f"{ticker}.json"))
    return data

# Forecasting
def make_model_and_graph(ticker, data, future_date):
    df_train = data[['Date', 'Close']]
    # From fbprophet Documentation
    df_train = df_train.rename(columns={"Date": "ds", "Close": "y"})
    model = Prophet()
    warnings.simplefilter("ignore", DeprecationWarning)
    warnings.simplefilter("ignore", FutureWarning)
    logging.getLogger('fbprophet').setLevel(logging.ERROR)
    with suppress_stdout_stderr():
        model.fit(df_train)
    # assuming yyyy-MM-dd
    stripped = future_date.split("-")
    fdate = dt(int(stripped[0]), int(stripped[1]), int(stripped[2]))
    period = fdate - dt.today()
    future = model.make_future_dataframe(periods=period.days, freq='D')
    # Predicted data
    # columns: ds is Date, cap, floor, trend, yhat
    prediction = model.predict(future)
    fig = plot.plot_plotly(model, prediction, xlabel='Date', ylabel='Closing', figsize=(800, 600))
    # slice to one year ago
    xstart = future.tail(period.days+365).head(1).ds.to_string().split(" ")[-1]
    fig.update_layout(overwrite=True, title_text=f"{ticker} Value Forecast", title_x=0.5, xaxis={"range":[xstart, future_date]}, showlegend=True)
    plotscript = fig.to_html(include_plotlyjs=False, include_mathjax=False, full_html=False, div_id="plotly-plot")
    fig.write_image(os.path.join("graphs", f"{ticker}.png"))
    with open(os.path.join("graphs", f"{ticker}-forecast.html"), 'w') as gfile:
        gfile.write(plotscript)
        gfile.close()
    value = prediction.tail(1).yhat.to_string().split(" ")[-1]
    return value

def make_prediction(ticker, date):
    jsonfile = os.path.join("raw", f"{ticker}.json")
    data = []
    if os.path.exists(jsonfile):
        last_date = read_json(jsonfile).tail(1).Date.to_string().split(" ")[-1]
        if last_date == today:
            data = read_json(jsonfile)
    if data == []:
        data = load_data(ticker, end=today)
    return make_model_and_graph(ticker, data, date)
    
# from https://stackoverflow.com/questions/11130156/suppress-stdout-stderr-print-from-python-functions
class suppress_stdout_stderr(object):
    '''
    A context manager for doing a "deep suppression" of stdout and stderr in
    Python, i.e. will suppress all print, even if the print originates in a
    compiled C/Fortran sub-function.
       This will not suppress raised exceptions, since exceptions are printed
    to stderr just before a script exits, and after the context manager has
    exited (at least, I think that is why it lets exceptions through).

    '''
    def __init__(self):
        # Open a pair of null files
        self.null_fds = [os.open(os.devnull, os.O_RDWR) for x in range(2)]
        # Save the actual stdout (1) and stderr (2) file descriptors.
        self.save_fds = (os.dup(1), os.dup(2))

    def __enter__(self):
        # Assign the null pointers to stdout and stderr.
        os.dup2(self.null_fds[0], 1)
        os.dup2(self.null_fds[1], 2)

    def __exit__(self, *_):
        # Re-assign the real stdout/stderr back to (1) and (2)
        os.dup2(self.save_fds[0], 1)
        os.dup2(self.save_fds[1], 2)
        # Close the null files
        os.close(self.null_fds[0])
        os.close(self.null_fds[1])

if __name__ == "__main__":
    """Download and create prediction graph. If data and graph has already been downloaded for today, don't download again."""
    try:
        ticker = sys.argv[1]
        date = sys.argv[2]
        sys.stdout.write(make_prediction(ticker, date))
    except Exception as e:
        sys.stderr.write(f"{type(e)}\n{e.args}\n");
