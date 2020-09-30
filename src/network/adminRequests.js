import { requestGet } from "./requests";
import { getUrl } from "Network/urls";

export const unflagPostWithPostId = (postId,token) => {
  return new Promise((resolve, reject) => {
    const url = getUrl("unflag_post");
    requestGet(`${url}?post_id=${postId}`,token)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const unflagThreadWithThreadId = (threadId,token) => {
  return new Promise((resolve, reject) => {
    const url = getUrl("unflag_thread");
    requestGet(`${url}?thread_id=${threadId}`,token)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const hidePostWithPostId = (postId,token) => {
  return new Promise((resolve, reject) => {
    const url = getUrl("hide_post");
    requestGet(`${url}?post_id=${postId}`,token)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const hideThreadWithThreadId = (threadId,token) => {
  return new Promise((resolve, reject) => {
    const url = getUrl("hide_thread");
    requestGet(`${url}?thread_id=${threadId}`,token)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getFlaggedPosts = (maxFlags,token) => {
  return new Promise((resolve, reject) => {
    const url = getUrl("get_flagged_posts"); 
    requestGet(`${url}?max_flags=${maxFlags}`,token)
      .then(res => {
        resolve(JSON.parse(res));
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getFlaggedThreads = (maxFlags,token) => {
  return new Promise((resolve, reject) => {
    const url = getUrl("get_flagged_threads");

    requestGet(`${url}?max_flags=${maxFlags}`,token)
      .then(res => {
        resolve(JSON.parse(res));
      })
      .catch(err => {
        reject(err);
      });
  });
};
