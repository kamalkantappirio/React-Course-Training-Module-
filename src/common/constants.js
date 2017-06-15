// TODO: Define the API root here
export const ENVIRONMENT = {
  API_ROOT: process.env.REACT_APP_API_ROOT || 'https://store-walk-services-dev.herokuapp.com',
  //API_ROOT: process.env.REACT_APP_API_ROOT || 'http://192.168.0.126:9000',
  AUTH_API_ROOT: process.env.REACT_APP_AUTH_API_ROOT || 'http://localhost:3001'
};

export const API_DATA = {
  API_VERSION: '4.0'
};

export const NEAR_BY_STORE = {
  RADIUS: '0.3'
}
export const ROLES = {
  HQ_MANAGER: 'HQ Operations',
  ZONE_LEADER: 'Zone Management',
  MARKET_MANAGER: 'Market Management',
  FIELD_CONSULTANTS: 'Field Consultant',
};

export const QUESTION_TYPE = {
  SELECT: 'Select',
  MULTI_SELECT: 'Multi-Select',
  TEXT: 'Text',
  TASK: 'Task',
  PRICE: 'Price',
};

export const TOGGLE_STATUS_QUESTION_PANEL = {
  ALL: 'All',
  UNANSWERED: 'UnAnswered',
};

// TODO: Define routes to API here
export const ROUTES = {};

export const USER = {
  USER: '/' + API_DATA.API_VERSION + '/user',
};

export const ZONE = {
  ZONE_LIST: '/' + API_DATA.API_VERSION + '/zone',
};

export const FC = {
  FC_LIST: '',
}

export const STORE = {
  STORE_LIST: '/' + API_DATA.API_VERSION + '/fc/'
};

export const TASK = {
  GET_TASK_LIST: '/' + API_DATA.API_VERSION + '/user/tasks',
  UPDATE_TASK: '/' + API_DATA.API_VERSION + '/task/'
};

export const SURVEY = {
  SUBMISSION: '/submission',
  SURVEY: '/survey/',
  ALL_SURVEYS: '',
  SURVEY_DETAIL: '',
  LIST_ALL_SERVICE_IN_ACCOUNT: '/' + API_DATA.API_VERSION + '/account/',
  GET_A_SUBMISSION: '/' + API_DATA.API_VERSION + '/submission/',
  CREATE_A_SUBMISSION: '/' + API_DATA.API_VERSION + '/account/',
  UPDATE_SUBMISSION: '/' + API_DATA.API_VERSION +'/submission/',
}

export const MARKET = {
  MARKET_LIST_IN_ZONE: '/zone/',
  FC_LIST_IN_MARKET: '/' + API_DATA.API_VERSION + '/market/',
};

export const LOCAL_STORAGE = {
  TOKEN: 'STOREWALK_TOKEN',
  USER: 'USER_INFORMATION',
};

export const GOOGLE_ANALYTICS_TRACKING_ID = 'UA-SOME-TRACKER-ID';