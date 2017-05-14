

// ACTION TYPES
export const STORE_USER = "storeUser";
export const STORE_PROC_EVALUATION = "storeProcEvaluation";
export const LOGIN = "login";
export const TOGGLE_SIDEBAR = 'showSidebar';
export const REQUEST_DASHBOARD_GOALS = 'requestDashboardGoals';
export const RECEIVE_DASHBOARD_GOALS = 'receiveDashboardGoals';
export const FETCH_ERROR_DASHBOARD_GOALS = 'fetchErrorDashboardGoals';
export const REQUEST_PAGED_GOALS = 'requestPagedGoals'
export const RECEIVE_PAGED_GOALS = 'receivePagedGoals'
export const FETCH_ERROR_PAGED_GOALS = 'fetchErrorPagedGoals'
export const RECEIVE_PAGED_TASKS = "receivePagedTasks"
export const REQUEST_PAGED_TASKS = "requestPagedTasks"
export const FETCH_ERROR_PAGED_TASKS = "fetchErrorPagedTasks"
export const LOGOUT = 'logout';
export const REQUEST_LONE_GOAL = "requestLoneGoal";
export const RECEIVE_LONE_GOAL = "receiveLoneGoal";
export const FETCH_ERROR_LONE_GOAL = "fetchErrorLoneGoal"
export const REQUEST_WHEEL_DATA = "requestWheelData"
export const RECEIVE_WHEEL_DATA = "receiveWheelData"
export const WHEEL_DATA_FETCH_FAILED = "wheelDataFetchFailed"
export const TASK_CREATED = "taskCreated"

// LOCAL URLS
export const HOME_PATH = '/';
export const PROCRASTINATION_PATH = 'procrastination';
export const PROCRASTINATION_RESULT_PATH = 'proc-result';
export const DASHBOARD_PATH = 'dashboard';
export const GOAL_DASHBOARD_PATH = 'goal-dashboard';
export const LOGIN_PATH = 'login';
export const LOGOUT_PATH = 'logout';
export const REGISTER_PATH = 'register';
export const TGROW_PATH = 'tgrow';
export const GOALS_PATH = 'goals';
export const WHEEL_INPUT_PATH = 'wheel';
export const PREVIOUS_GOALS_PATH = 'previous-goals';
export const ALL_GOALS_PATH = 'all-goals'


//REMOTE URL
export const REMOTE_BASE_URL = "http://localhost:8000/v1/";
//export const REMOTE_BASE_URL = "https://goals-webapp.herokuapp.com/v1/";
export const REMOTE_REG_PATH = "users/"
export const REMOTE_PROCRASTINATION_PATH = "procrastination/";
export const IMAGE_UPLOAD_PATH = "images/"
export const REMOTE_LOGIN_PATH = "login/";
export const REMOTE_WHEEL_EVALUATION_PATH = "wheel/";
export const REMOTE_GOALS_PATH = "goals/"
export const REMOTE_PAGED_GOALS_PATH = "goals/paged/"
export const REMOTE_PAGED_TASK_PATH = "tasks/paged/"
export const REMOTE_PREVIOUS_GOALS_PATH = 'previous-goals/';
export const REMOTE_TASK_PATH = 'task/'
export const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/wordsmith/image/upload';
export const CLOUDINARY_IMAGE_ACCESS_URL = 'https://res.cloudinary.com/wordsmith/image/asset/';

// ERRORS
export const USERNAME_EXIST = "The Email address already exists";
export const PHONE_EXIST = "The Phone number already exist";
export const NETWORK_ERROR = "A network error occured";
export const GENERIC_ERROR = "An error occured";
export const SERVER_ERROR = "A server error occured";
export const AUTHENTICATION_ERROR = "Invalid username/password";
export const NOT_FOUND_ERROR = "Request resource was not found"

//MISC
/*export const LIFE_COMPONENTS_VALUES =  [
    "Finance",
    "Health & Wellbeing",
    "Achievement & Success",
    "Contentment & Peace",
    "Friendship & Networks",
    "Security & Spirituality",
    "Energy & Passion",
    "Fun, Recreation & Rest",
    "Home & Family",
    "Career, Work or Business",
    "Relationship or Marriage",
    "Self- Esteem, Confidence & Belief",
];

export const LIFE_COMPONENTS_KEYS = [
    "comp1",
    "comp2",
    "comp3",
    "comp4",
    "comp5",
    "comp6",
    "comp7",
    "comp8",
    "comp9",
    "comp10",
    "comp11",
    "comp12",
];
*/
export const LIFE_COMPONENTS = [
    {"key": "comp1", "value": "Finance"},
    {"key": "comp2", "value": "Health & Wellbeing"},
    {"key": "comp3", "value": "Achievement & Success"},
    {"key": "comp4", "value": "Contentment & Peace"},
    {"key": "comp5", "value": "Friendship & Networks"},
    {"key": "comp6", "value": "Security & Spirituality"},
    {"key": "comp7", "value": "Energy & Passion"},
    {"key": "comp8", "value": "Recreation & Rest"},
    {"key": "comp9", "value": "Home & Family"},
    {"key": "comp10", "value": "Career, Work or Business"},
    {"key": "comp11", "value": "Relationship or Marriage"},
    {"key": "comp12", "value": "Self- Esteem, Confidence & Belief"},
];



export const SIDEBAR_ITEMS = [
    {title: 'Dashboard', link: DASHBOARD_PATH},
    {title: 'Wheel of Life', link: WHEEL_INPUT_PATH},
    {title: 'Create Goal', link: GOALS_PATH},
    {title: 'Take Procrastination Test', link: PROCRASTINATION_PATH },
    {title: 'Goal Dashboard', link: GOAL_DASHBOARD_PATH },
];

export const NO_SIDEBAR_PAGES = ['login', 'register'];
export const WHITE_NAV_PAGES = ['/'];
export const WHITE_NAV = 'whiteNav';
export const BLUE_NAV = 'blueNav';
export const GOALS_ID_QUERY_PARAM = 'id';
export const DASHBOARD_GOALS_LIMIT = 10
export const TASK_CREATION_SUCCESS = 'Task has successfully been created'
export const FORM_CREATE_ACTION = 'create'
export const FORM_UPDATE_ACTION = 'update'
export const PAGINATION_ITEMS_PER_PAGE = 2
export const PAGINATION_PREVIOUS_TEXT = "Previous"
export const PAGINATION_NEXT_TEXT = "Next"
export const TASKS_LIMIT = 10
