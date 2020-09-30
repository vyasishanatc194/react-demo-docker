import React from "react";
import { formatDateTime } from "Utils/functions";
import "./styles.less";

class FlaggedThread extends React.Component {
  render() {
    const { item, handleUnflagThread, handleDeleteThread } = this.props;
    const formattedDateTime = formatDateTime(item.created_at);

    let tags = [];
    item.hashtags.forEach((t, i) => {
      const tag =
        item.hashtags.length === i + 1 ? t : `${t}, `;
      tags.push(tag);
    });

    return (
      <tr>
        <td>{item.num_flags}</td>
        <td>{item.subject}</td>
        <td>{item.content}</td>
        <td>{tags}</td>
        <td>{item.user.nickname}</td>
        <td>{formattedDateTime}</td>
        <td styleName="unflag" onClick={()=> handleUnflagThread(item.id)}>
          Aufheben
        </td>
        <td styleName="delete" onClick={()=> handleDeleteThread(item.id)}>
          Löschen
        </td>
      </tr>
    );
  }
}

export default FlaggedThread;
