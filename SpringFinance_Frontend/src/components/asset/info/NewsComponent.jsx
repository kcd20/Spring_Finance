import { Component } from 'react';
import AssetService from '../../../services/AssetService';
import { List, ListItem } from '@react-md/list';
import "./info.css";

class NewsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: this.props.ticker,
            feedData: "",
        };
    }
    componentDidMount() {
        AssetService.getAssetNews(this.state.ticker).then((res) => {
            this.setState({feedData : res.data});
        });
    }

    render() {
        const data = this.state.feedData;
        return(
            data &&
            <div id="news" className="newsComponent">
              <h6>Related News</h6>
                <List>
                    {data.map(({ link, title }, i) => (
                        <ListItem
                          className="newsItem"
                            id={`news-item-${i}`}
                            key={i}
                            secondaryText=""
                            threeLines
                            >
                          <a href={`${link}`}>{title}</a><br/>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}
export default NewsComponent;
