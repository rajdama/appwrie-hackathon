import {
  excerciseApiAxiosInstance,
  foodApiAxiosInstance,
  imageApiAxiosInstance,
  serverAxiosInstance,
} from '../helpers/axios'
import { user_constants } from './constants'
let headers = ''
const setHeaders = (token) => {
  let setHeader = {
    headers: { authorization: token ? `Bearer ${token}` : '' },
  }
  return setHeader
}

export const foodList = (foodTitle) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.FOOD_LIST_REQUEST,
    })
    const res = await foodApiAxiosInstance.get(
      `/search?q=${foodTitle}&app_id=edf97c8d&app_key=e6569539d403bd3727030a61decea576`
    )
    console.log(res)
    if (res.status === 200) {
      const foodlist = res.data
      console.log(foodlist)
      dispatch({
        type: user_constants.FOOD_LIST_SUCCESS,
        payload: { selectedFood: foodlist },
      })
    } else {
      dispatch({
        type: user_constants.FOOD_LIST_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}

export const mealPlanExists = (userId, currentDate, token) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.MEAL_PLAN_EXISTS_REQUEST,
    })
    try {
      const res = await serverAxiosInstance.post(
        `/mealPlanExists`,
        {
          userId,
          date: currentDate,
        },
        setHeaders(token)
      )
      dispatch({
        type: user_constants.MEAL_PLAN_EXISTS_SUCCESS,
        payload: { exists: res.data },
      })
    } catch (error) {
      dispatch({
        type: user_constants.MEAL_PLAN_EXISTS_FAILURE,
        payload: { error: error.response.data.error },
      })
    }
  }
}

export const createMealPlan = (food, period, userId, currentDate, token) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.CREATE_MEAL_PLAN_REQUEST,
    })
    try {
      const res = await serverAxiosInstance.post(
        `/createMealPlan`,
        {
          food,
          period,
          userId,
          date: currentDate,
        },
        setHeaders(token)
      )
      dispatch({
        type: user_constants.CREATE_MEAL_PLAN_SUCCESS,
        payload: { message: 'Meal Plan Created' },
      })
    } catch (error) {
      dispatch({
        type: user_constants.CREATE_MEAL_PLAN_FAILURE,
        payload: { error: error.response.data.error },
      })
    }
  }
}

export const updateMealPlan = (food, period, userId, currentDate, token) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.UPDATE_MEAL_PLAN_REQUEST,
    })
    try {
      const res = await serverAxiosInstance.post(
        `/updateMealPlan`,
        {
          food,
          period,
          userId,
          date: currentDate,
        },
        setHeaders(token)
      )
      const parsedMealPlan = JSON.parse(res.data.mealPlan)
      dispatch({
        type: user_constants.UPDATE_MEAL_PLAN_SUCCESS,
        payload: { mealPlan: parsedMealPlan },
      })
    } catch (error) {
      dispatch({
        type: user_constants.UPDATE_MEAL_PLAN_FAILURE,
        payload: { error: error.response.data.error },
      })
    }
  }
}

export const getMealPlan = (userId, currentDate, token) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.GET_MEAL_PLAN_REQUEST,
    })

    try {
      let res = await serverAxiosInstance.post(
        `/getMealPlan`,
        {
          userId,
          date: currentDate,
        },
        setHeaders(token)
      )
      dispatch({
        type: user_constants.GET_MEAL_PLAN_SUCCESS,
        payload: { mealPlan: res.data },
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: user_constants.GET_MEAL_PLAN_FAILURE,
        payload: { error: error.response.data.error },
      })
    }
  }
}

export const getExcerciseImage = (excerciseName) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.GET_EXCERCISE_IMAGE_REQUEST,
    })
    const res = await imageApiAxiosInstance.get(
      `?key=37195839-4b03055c351413a0b273e2574&q=${excerciseName}&image_type=photo`
    )
    if (res.status === 200) {
      dispatch({
        type: user_constants.GET_EXCERCISE_IMAGE_SUCCESS,
        payload: { images: res.data.hits[0] },
      })
    } else {
      dispatch({
        type: user_constants.GET_EXCERCISE_IMAGE_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}

export const getExcerciseCalories = (excercise, duration) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.GET_EXCERCISE_CALORIES_REQUEST,
    })
    const res = await excerciseApiAxiosInstance.post('v2/natural/exercise', {
      query: `${excercise} for ${duration} minutes`,
    })
    console.log(res)
    if (res.status === 200) {
      dispatch({
        type: user_constants.GET_EXCERCISE_CALORIES_SUCCESS,
        payload: { excerciseInfo: res.data },
      })
    } else {
      dispatch({
        type: user_constants.GET_EXCERCISE_CALORIES_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}

export const createExcercisePlan = (excercise, userId, currentDate, token) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.CREATE_EXCERCISE_PLAN_REQUEST,
    })
    try {
      const res = await serverAxiosInstance.post(
        '/createExcercisePlan',
        {
          excercise,
          userId,
          date: currentDate,
        },
        setHeaders(token)
      )

      dispatch({
        type: user_constants.CREATE_EXCERCISE_PLAN_SUCCESS,
        payload: { excercisePlan: res.data },
      })
    } catch (error) {
      dispatch({
        type: user_constants.CREATE_EXCERCISE_PLAN_FAILURE,
        payload: { error: error.response.data.error },
      })
    }
  }
}

export const getExcercisePlan = (userId, currentDate, token) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.GET_EXCERCISE_PLAN_REQUEST,
    })

    try {
      const res = await serverAxiosInstance.post(
        `/getExcercisePlan`,
        {
          userId,
          date: currentDate,
        },
        setHeaders(token)
      )
      dispatch({
        type: user_constants.GET_EXCERCISE_PLAN_SUCCESS,
        payload: { excercisePlan: res.data },
      })
    } catch (error) {
      dispatch({
        type: user_constants.GET_EXCERCISE_PLAN_FAILURE,
        payload: { error: error.response.data.error },
      })
    }
  }
}

export const excercisePlanExists = (userId, currentDate, token) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.EXCERCISE_PLAN_EXISTS_REQUEST,
    })

    try {
      const res = await serverAxiosInstance.post(
        `/excercisePlanExist`,
        {
          userId,
          date: currentDate,
        },
        setHeaders(token)
      )
      dispatch({
        type: user_constants.EXCERCISE_PLAN_EXISTS_SUCCESS,
        payload: { excercisePlanExist: res.data },
      })
    } catch (error) {
      dispatch({
        type: user_constants.EXCERCISE_PLAN_EXISTS_FAILURE,
        payload: { error: error.response.data.error },
      })
    }
  }
}

export const updateExcercisePlan = (excercise, userId, currentDate, token) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.UPDATE_EXCERCISE_PLAN_REQUEST,
    })
    try {
      const res = await serverAxiosInstance.post(
        `/updateExcercisePlan`,
        {
          excercise,
          userId,
          date: currentDate,
        },
        setHeaders(token)
      )
      dispatch({
        type: user_constants.UPDATE_EXCERCISE_PLAN_SUCCESS,
        payload: { excercisePlan: res.data },
      })
    } catch (error) {
      dispatch({
        type: user_constants.UPDATE_EXCERCISE_PLAN_FAILURE,
        payload: { error: error.response.data.error },
      })
    }
  }
}

export const getCurrentMonthPlan = (month, userId, token) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.GET_CURRENT_MONTH_PLAN_REQUEST,
    })

    try {
      const res = await serverAxiosInstance.post(
        `/getCurrentMonthPlan`,
        {
          userId,
          month,
        },
        setHeaders(token)
      )
      dispatch({
        type: user_constants.GET_CURRENT_MONTH_PLAN_SUCCESS,
        payload: { currentMonthPlan: res.data },
      })
    } catch (error) {
      dispatch({
        type: user_constants.GET_CURRENT_MONTH_PLAN_FAILURE,
        payload: { error: error.response.data.error },
      })
    }
  }
}

export const addUserGoal = (userId, goal, token) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.ADD_USER_GOAL_REQUEST,
    })

    try {
      const res = await serverAxiosInstance.post(
        `/addUserGoal`,
        {
          userId,
          goal,
        },
        setHeaders(token)
      )
      dispatch({
        type: user_constants.ADD_USER_GOAL_SUCCESS,
        payload: { goal: res.data.goal },
      })
    } catch (error) {
      dispatch({
        type: user_constants.ADD_USER_GOAL_FAILURE,
        payload: { error: error.response.data.error },
      })
    }
  }
}

export const getUserGoal = (userId, token) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.GET_USER_GOAL_REQUEST,
    })

    try {
      const res = await serverAxiosInstance.post(
        `/getUserGoal`,
        {
          userId,
        },
        setHeaders(token)
      )
      console.log(res)
      dispatch({
        type: user_constants.GET_USER_GOAL_SUCCESS,
        payload: { goal: res.data.goal },
      })
    } catch (error) {
      dispatch({
        type: user_constants.GET_USER_GOAL_FAILURE,
        payload: { error: error.response.data.error },
      })
    }
  }
}

export const getChatBotMessage = (msg, token) => {
  return async (dispatch) => {
    dispatch({
      type: user_constants.GET_CHAT_BOT_MESSAGE_REQUEST,
    })

    if (msg !== 0) {
      try {
        const res = await serverAxiosInstance.post(
          `/chatBot`,
          { msg },
          setHeaders(token)
        )

        dispatch({
          type: user_constants.GET_CHAT_BOT_MESSAGE_SUCCESS,
          payload: { chatBotMsg: res.data[0].message.content },
        })
      } catch (error) {
        dispatch({
          type: user_constants.GET_CHAT_BOT_MESSAGE_FAILURE,
          payload: { error: error.response.data.error },
        })
      }
    } else {
      dispatch({
        type: user_constants.GET_CHAT_BOT_MESSAGE_SUCCESS,
        payload: { chatBotMsg: '' },
      })
    }
  }
}
