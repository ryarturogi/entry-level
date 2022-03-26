import { GET_JOBS, JOBS_ERROR } from '../types'
import { provider } from '@/utils/initDatabase'

export const getJobs = () => async (dispatch) => {
  try {
    let { data: Jobs } = await provider.from('Jobs').select('*')
    dispatch({
      type: GET_JOBS,
      payload: Jobs,
    })
  } catch (error) {
    dispatch({
      type: JOBS_ERROR,
      payload: error,
    })
  }
}

export const getJob = (jobId) => async (dispatch) => {
  try {
    let { data: Jobs } = await provider.from('Jobs').select('id').eq('jobs.id', jobId)
    dispatch({
      type: GET_JOBS,
      payload: Jobs,
    })
  } catch (error) {
    dispatch({
      type: JOBS_ERROR,
      payload: error,
    })
  }
}
