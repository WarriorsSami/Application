import React from "react";

import {
    Card,
    CardBody,
    Col, Row,
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authenticationService } from '../../_services/authentication.service';

class Register extends React.Component {
    render() {
        return (
            <>
                <Col lg="6" md="8">
                    <Card className="bg-secondary shadow border-0">

                        <CardBody className="px-lg-5 py-lg-5">
                            <h2 className="text-center">Register here</h2>
                            <Formik

                                initialValues={{
                                    firstname: '',
                                    lastname: '',
                                    username: '',
                                    email: '',
                                    password: ''
                                }}

                                validationSchema={Yup.object().shape({
                                    firstname: Yup.string().required('First  name is required'),
                                    lastname: Yup.string().required('Last name is required'),
                                    username: Yup.string().required('User name is required'),
                                    password: Yup.string().required('Password is required'),
                                    email:  Yup.string().required('Email is required')
                                })}

                                onSubmit={({firstname, lastname, username, email, password}, {setStatus, setSubmitting}) => {
                                    setStatus();
                                    authenticationService.register(firstname, lastname, username, email, password)
                                        .then(
                                            user => {
                                                const {from} = this.props.location.state || {from: {pathname: "/"}};
                                                this.props.history.push(from);
                                                window.location.reload(true);
                                            },
                                            error => {
                                                setSubmitting(false);
                                                setStatus(error);
                                            }
                                        );
                                }}

                                render={({errors, status, touched, isSubmitting}) => (
                                    <Form>

                                        <div className="form-group">
                                            <label htmlFor="firstname">First Name</label>
                                            <Field name="firstname" type="text"
                                                   className={'form-control' + (errors.firstname && touched.firstname ? ' is-invalid' : '')}/>
                                            <ErrorMessage name="firstname" component="div"
                                                          className="invalid-feedback"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="lastname">Last Name</label>
                                            <Field name="lastname" type="text"
                                                   className={'form-control' + (errors.lastname && touched.lastname ? ' is-invalid' : '')}/>
                                            <ErrorMessage name="lastname" component="div" className="invalid-feedback"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="username">Username</label>
                                            <Field name="username" type="text"
                                                   className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')}/>
                                            <ErrorMessage name="username" component="div" className="invalid-feedback"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <Field name="email" type="email"
                                                   className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}/>
                                            <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <Field name="password" type="password"
                                                   className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}/>
                                            <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary"
                                                    disabled={isSubmitting}>Signup
                                            </button>
                                            {isSubmitting &&
                                            <img
                                                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                                            }
                                        </div>
                                        {status &&
                                        <div className={'alert alert-danger'}>{status}</div>
                                        }
                                    </Form>
                                )}
                            />
                        </CardBody>
                    </Card>
                    <Row className="mt-3">
                        <Col className="text-right" xs="6">
                            <a
                                className="text-light"
                                href="/auth/login"
                            >
                                <small>Already have an account?</small>
                            </a>
                        </Col>
                    </Row>
                </Col>
            </>
        );
    }
};

export default Register;
