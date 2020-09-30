import React from "react";
import { formatDateTime } from "Utils/functions";
import "./styles.less";

class FlaggedPost extends React.Component {
  render() {
    const { item, handleUnflagPost, handleDeletePost } = this.props;
    const formattedDateTime = formatDateTime(item.created_at);

    return (
      <tr>
        <td>{item.num_flags}</td>
        <td>{item.content}</td>
        <td>{item.user.nickname}</td>
        <td>{formattedDateTime}</td>
        <td styleName="unflag" onClick={()=> handleUnflagPost(item.id)}>
          Aufheben
        </td>
        <td styleName="delete" onClick={()=> handleDeletePost(item.id)}>
          Löschen
        </td>
      </tr>
    );
  }
}

export default FlaggedPost;
