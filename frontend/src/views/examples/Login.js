import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import { Formik, Field, ErrorMessage, Form } from 'formik';
import {authenticationService} from "../../_services/authentication.service";
import * as Yup from 'yup';

class Login extends React.Component {

    render() {
        return (
            <>
                <Col lg="5" md="7">
                    <Card className="bg-secondary shadow border-0">
                        <CardBody className="px-lg-5 py-lg-5">
                            <h2 className="text-center">Login here</h2>
                            <hr/>

                            <Formik
                                initialValues={{
                                    username: '',
                                    password: ''
                                }}
                                validationSchema={Yup.object().shape({
                                    username: Yup.string().required('Username is required'),
                                    password: Yup.string().required('Password is required')
                                })}

                                onSubmit={({username, password}, {setStatus, setSubmitting}) => {
                                    setStatus();
                                    authenticationService.login(username, password)
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
                                            <label htmlFor="username">Username</label>
                                            <Field name="username" type="text"
                                                   className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')}/>
                                            <ErrorMessage name="username" component="div" className="invalid-feedback"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <Field name="password" type="password"
                                                   className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}/>
                                            <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary"
                                                    disabled={isSubmitting}>Login
                                            </button>
                                            {"  "}
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
                        <Col xs="6">
                            <a
                                className="text-light"
                                href="#"
                                onClick={(e) => e.preventDefault()}
                            >
                                <small>Forgot password?</small>
                            </a>
                        </Col>
                        <Col className="text-right" xs="6">
                            <a
                                className="text-light"
                                href="/auth/register"
                            >
                                <small>Create new account</small>
                            </a>
                        </Col>
                    </Row>
                </Col>
            </>
        );
    }
};

export default Login;
