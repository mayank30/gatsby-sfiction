import React, { Component } from 'react';
import ReactDisqusComments from 'react-disqus-comments';
import config from '../../../data/SiteConfig';
import './Disqus.css';

class Disqus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toasts: [],
    };
    this.notifyAboutComment = this.notifyAboutComment.bind(this);
    this.onSnackbarDismiss = this.onSnackbarDismiss.bind(this);
  }

  onSnackbarDismiss() {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  }
  notifyAboutComment() {
    const toasts = this.state.toasts.slice();
    toasts.push({ text: 'New comment available!' });
    this.setState({ toasts });
  }
  render() {
    const { post } = this.props;
    if (!config.disqusShortname) {
      return null;
    }
    return (
      <figure className="comments figure">
        <ReactDisqusComments className="disqus"
                             shortname={config.disqusShortname}
                             identifier={post.id}
                             title={post.title}
                             url={post.url}
                             category_id={post.category_id}
                             onNewComment={this.notifyAboutComment} />
      </figure>
    );
  }
}

export default Disqus;
