import { requestPost,requestGet } from "./requests";
import { getUrl } from "Network/urls";

export const flagThreadWithThreadId = id => {
  return new Promise((resolve, reject) => {
    const url = getUrl("flag_thread");

    requestGet(`${url}?thread_id=${id}`)
      .then(res => {
        const parsed = JSON.parse(res);
        resolve(parsed);
      })
      .catch(err => {
        console.log(err);
      });
  });
};

export const flagPostWithPostId = id => {
  return new Promise((resolve, reject) => {
    const url = getUrl("flag_post");

    requestGet(`${url}?post_id=${id}`)
      .then(res => {
        const parsed = JSON.parse(res);
        resolve(parsed);
      })
      .catch(err => {
        console.log(err);
      });
  });
};

export const editThreadWithThreadId = (subject, content, hashtags, id) => {
  return new Promise((resolve, reject) => {
    const url = getUrl("edit_thread");

    const data = JSON.stringify({
      subject,
      content,
      hashtags,
      thread_id: id,
    });

    requestPost(data, url)
      .then(res => {
        const parsed = JSON.parse(res);
        resolve(parsed);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
