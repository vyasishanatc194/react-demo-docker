const getBaseUrl = () => {
  const dev = process.env.NODE_ENV === 'development';

  if (dev) {
    return 'http://localhost:8000';
  } else {
    return '';
  }
};

export const getUrl = (type) => {
  const baseUrl = getBaseUrl();

  switch (type) {
    // base
    case 'base':
      return baseUrl;

    // user
    case 'create_thread':
      return `${baseUrl}/api/thread/create`;
    case 'create_moderator_thread':
      return `${baseUrl}/api/thread/create_moderator_thread`;
    case 'edit_thread':
      return `${baseUrl}/api/user/edit_thread`;
    case 'create_post':
      return `${baseUrl}/api/post/create`;
    case 'flag_thread':
      return `${baseUrl}/api/thread/flag`;
    case 'flag_post':
      return `${baseUrl}/api/post/flag`;

    // load
    case 'load_thread':
      return `${baseUrl}/api/thread/load`;
    case 'load_sorted_threads':
      return `${baseUrl}/api/thread/sorted`;
    case 'threads_in_neighborhood':
      return `${baseUrl}/api/load/threads_in_neighborhood/`;
    case 'more_post':
      return `${baseUrl}/api/load/more_post`;
    case 'threads_in_area':
      return `${baseUrl}/api/thread/area_threads`;
    case 'total_num_threads':
      return `${baseUrl}/api/thread/total`;
    case 'user_created_threads':
      return `${baseUrl}/api/load/user_created_threads`;

    // admin auth
    case 'get_token':
      return `${baseUrl}/api/auth/get_token`;
    case 'logout':
      return `${baseUrl}/api/auth/logout`;
    case 'check_token':
      return `${baseUrl}/api/auth/check_token`;

    // admin
    case 'unflag_post':
      return `${baseUrl}/api/post/unflag`;
    case 'unflag_thread':
      return `${baseUrl}/api/thread/unflag`;
    case 'hide_post':
      return `${baseUrl}/api/post/hide`;
    case 'hide_thread':
      return `${baseUrl}/api/thread/hide`;
    case 'get_flagged_posts':
      return `${baseUrl}/api/post/flagged`;
    case 'get_flagged_threads':
      return `${baseUrl}/api/thread/flagged`;

    // subscription
    case 'send_confirm_subscription':
      return `${baseUrl}/api/subscription/send_confirm_subscription`;

    // best ideas voting
    case 'get_voting_user_session':
      return `${baseUrl}/api/scoring/get_user_session`
    case 'get_voting_choices':
      return `${baseUrl}/api/scoring/get_choices`;
    case 'send_voting_choice':
      return `${baseUrl}/api/scoring/set_choices`;

    // pub talks
    case 'get_pub_talks':
      return `${baseUrl}/api/pubtalk/get`;
    case 'get_one_pub_talk':
      return `${baseUrl}/api/pubtalk/id`;
    case 'pub_talk_registration':
      return `${baseUrl}/api/pubtalk/register`;
    case 'register_manually':
      return `${baseUrl}/api/pubtalk/register_manually`;

    // protocols
    case 'submit_protocol':
      return `${baseUrl}/api/protocol/submit`;
    case 'get_all_protocols':
      return `${baseUrl}/api/protocol/all`;
    case 'get_protocol':
      return `${baseUrl}/api/protocol/pub_talk`;
    case 'edit_protocol':
      return `${baseUrl}/api/protocol/edit`;

    // support
    case 'support_contact':
      return `${baseUrl}/api/support/contact`;

    default:
      return baseUrl;
  }
};
