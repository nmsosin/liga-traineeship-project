import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Task title is required')
    .min(3, 'Task title must be at least 3 characters')
    .max(100, 'Task title must not exceed 100 characters'),
  info: Yup.string()
    .required('Task description is required')
    .min(3, 'Task description must be at least 3 characters')
    .max(500, 'Task title must not exceed 500 characters'),
  acceptTerms: Yup.bool(),
  isCompleted: Yup.bool(),
});
