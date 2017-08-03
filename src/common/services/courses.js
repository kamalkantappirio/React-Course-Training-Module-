/**
 * Created by kamalkant on 26/07/17.
 */
import { ENVIRONMENT, COURSES } from '../constants';
import { handleFetch } from './handlers';

export function getAvailableCoursesList() {
  const url = `${ENVIRONMENT.API_ROOT}${COURSES.COURSES_LIST}`;
  const options = {
    method: 'GET'
  };
  return handleFetch(url, options);
}

export function getCourseDetail(courseId) {
  const url = `${ENVIRONMENT.API_ROOT}${COURSES.COURSES_DETAIL}`;
  const options = {
    method: 'POST',
    headers: {
      courseId
    }
  };

  return handleFetch(url, options);
}

export function getUserCourseDetail(userId, courseId) {
  const url = `${ENVIRONMENT.API_ROOT}${COURSES.USER_COURSES_DETAIL}`;
  const options = {
    method: 'POST',
    headers: {
      courseId,
      userId
    }
  };

  return handleFetch(url, options);
}


export function getEnrollCoursesList(userId) {
  const url = `${ENVIRONMENT.API_ROOT}${COURSES.USER_COURSE}`;
  console.log(url);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user_id: userId })
  };
  return handleFetch(url, options);
}

export function enrollUserToCourse(voucherCode, payload) {
  const url = `${ENVIRONMENT.API_ROOT}${COURSES.ENROLL_USER_TO_COURSE}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      voucherCode
    },
    body: JSON.stringify({ data: payload })
  };
  return handleFetch(url, options);
}


export function updatedUserCourseDetail(payload) {
  const url = `${ENVIRONMENT.API_ROOT}${COURSES.UPDATE_USER_COURSE}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data: payload })
  };
  return handleFetch(url, options);
}


export function completeCourse(payload) {
  const url = `${ENVIRONMENT.API_ROOT}${COURSES.MARK_COURSE_AS_COMPLETED}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data: payload })
  };
  return handleFetch(url, options);
}

export function getCompletedCourse(payload) {
  const url = `${ENVIRONMENT.API_ROOT}${COURSES.GET_COMPLETED_COURSES}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data: payload })
  };
  return handleFetch(url, options);
}

export function getVideoList() {
  const url = `${ENVIRONMENT.API_ROOT}${COURSES.GET_VIDEO_LIST}`;
  const options = {
    method: 'GET'
  };
  return handleFetch(url, options);
}
