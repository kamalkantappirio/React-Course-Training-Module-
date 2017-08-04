export const ENVIRONMENT = {
  API_ROOT: 'http://localhost:3000'
};

export const API_CONST = {
  ACCOUNT: '/account',
  LOGIN: '/login',
  LOGOUT: '/logout',
  MAPPING: '/mapping',
  FIELDS: '/fields',
  AUTH: '/',
};

export const COURSES = {
  COURSES_LIST: '/api/v1.0/courses/availableCourseList',
  COURSES_DETAIL: '/api/v1.0/courses/courseDetail',
  USER_COURSES_DETAIL: '/api/v1.0/courses/userCourseDetail',
  ENROLL_COURSE: 'api/v1.0/courses/getUserCourses',
  USER_COURSE: '/api/v1.0/user/getUserCourses',
  ENROLL_USER_TO_COURSE: '/api/v1.0/courses/enrollCourse',
  UPDATE_USER_COURSE: '/api/v1.0/user/updateUserCourse',
  MARK_COURSE_AS_COMPLETED: '/api/v1.0/user/markCourseCompleted',
  GET_COMPLETED_COURSES: '/api/v1.0/user/getUserCompletedCourses',
  GET_VIDEO_LIST: '/api/v1.0/course/getTotalVideos',
  ADD_COURSE_NOTES: '/api/v1.0/course/addCourseNotes',
  GET_USER_NOTES: '/api/v1.0/course/getUserNotes',
  GET_COURSE_NOTES: '/api/v1.0/course/getCourseNote',

};


export const END_POINT = {
  ACCOUNT: '/account',
  CONTACTS: '/contacts'
};
