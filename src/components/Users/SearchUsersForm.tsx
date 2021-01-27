import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FilterType } from "../../redux/reducers/usersReducer";

const searchUsersValidateForm = (values: any) => {
  const errors = {};
  return errors;
}

type FormType = {
  term: string
  friend: "true" | "false" | "null"
}

type PropsType = {
  onFilterChange(filter: FilterType): void
}

const SearchUsersForm: React.FC<PropsType> = ({ onFilterChange }) => {
  const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filterValues: FilterType = {
      term: values.term,
      friend: values.friend === "null" ? null : values.friend === "true" ? true : false
    }
    onFilterChange(filterValues)
    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={{ term: "", friend: "null" }}
      validate={searchUsersValidateForm}
      onSubmit={submit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="term" />
          <Field name="friend" as="select" className="select">
            <option value="null">All</option>
            <option value="true">Only followed</option>
            <option value="false">Only unfollowed</option>
          </Field>
          <button type="submit" disabled={isSubmitting}>
            Find
        </button>
        </Form>
      )}
    </Formik>
  )
};

export default SearchUsersForm;
