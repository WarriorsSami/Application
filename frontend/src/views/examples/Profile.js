import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authenticationService } from '../../_services/authentication.service';

class Profile extends React.Component {
  render() {
    return (
        <>
          <UserHeader/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row>
              <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                <Card className="card-profile shadow">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={
                                require("../../assets/img/theme/team-4-800x800.jpg")
                                    .default
                              }
                          />
                        </a>
                      </div>
                    </Col>
                  </Row>
                  <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    <div className="d-flex justify-content-between">
                      <Button
                          className="mr-4"
                          color="info"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                      >
                        Connect
                      </Button>
                      <Button
                          className="float-right"
                          color="default"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                      >
                        Message
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody className="pt-0 pt-md-4">
                    <Row>
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                          <div>
                            <span className="heading">22</span>
                            <span className="description">Friends</span>
                          </div>
                          <div>
                            <span className="heading">10</span>
                            <span className="description">Photos</span>
                          </div>
                          <div>
                            <span className="heading">89</span>
                            <span className="description">Comments</span>
                          </div>
                        </div>
                      </div>
                    </Row>
                    <div className="text-center">
                      <h3>
                        {authenticationService.currentUserValue.firstName + " " + authenticationService.currentUserValue.lastName}
                        <span className="font-weight-light">, 27</span>
                      </h3>
                      <div className="h5 font-weight-300">
                        <i className="ni location_pin mr-2"/>
                        Bucharest, Romania
                      </div>
                      <div className="h5 mt-4">
                        <i className="ni business_briefcase-24 mr-2"/>
                        Solution Manager - Creative Tim Officer
                      </div>
                      <div>
                        <i className="ni education_hat mr-2"/>
                        University of Computer Science
                      </div>
                      <hr className="my-4"/>
                      <p>
                        Ryan — the name taken by Melbourne-raised, Brooklyn-based
                        Nick Murphy — writes, performs and records all of his own
                        music.
                      </p>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        Show more
                      </a>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">My account</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                            color="primary"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                        >
                          Settings
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>

                  <Container style={{marginTop: "40px"}}>
                    <Formik

                        initialValues={{
                          firstname: authenticationService.currentUserValue.firstName,
                          lastname: authenticationService.currentUserValue.lastName,
                          username: authenticationService.currentUserValue.username,
                          email: authenticationService.currentUserValue.email,
                          password: ''
                        }}

                        validationSchema={Yup.object().shape({
                          firstname: Yup.string().required('First  name is required'),
                          lastname: Yup.string().required('Last name is required'),
                          username: Yup.string().required('User name is required'),
                          email: Yup.string().required('Email is required'),
                          password: Yup.string().required('Password is required'),
                        })}

                        onSubmit={({firstname, lastname, username, email, password}, {setStatus, setSubmitting}) => {
                          setStatus();

                          authenticationService.update(firstname, lastname, username, email, password)
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
                              <Row>

                                <Col lg="6">
                                  <div className="form-group">
                                    <label htmlFor="firstname">First Name</label>
                                    <Field name="firstname" type="text"
                                           className={'form-control' + (errors.firstname && touched.firstname ? ' is-invalid' : '')}/>
                                    <ErrorMessage name="firstname" component="div"
                                                  className="invalid-feedback"/>
                                  </div>
                                </Col>

                                <Col>
                                  <div className="form-group">
                                    <label htmlFor="lastname">Last Name</label>
                                    <Field name="lastname" type="text"
                                           className={'form-control' + (errors.lastname && touched.lastname ? ' is-invalid' : '')}/>
                                    <ErrorMessage name="lastname" component="div" className="invalid-feedback"/>
                                  </div>
                                </Col>

                              </Row>

                              <Row>
                                <Col lg="6">
                                  <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <Field name="username" type="text"
                                           className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')}/>
                                    <ErrorMessage name="username" component="div" className="invalid-feedback"/>
                                  </div>
                                </Col>
                                <Col lg="6">
                                  <div className="form-group">
                                    <label htmlFor="password">Email</label>
                                    <Field name="email" type="text"
                                           className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}/>
                                    <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col lg="12">
                                  <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field name="password" type="password"
                                           className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}/>
                                    <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col>
                                  <div style={{textAlign: "center"}}>
                                    <div className="form-group">
                                      <button type="submit" className="btn btn-primary"
                                              disabled={isSubmitting}>Update information
                                      </button>
                                      {isSubmitting &&
                                      <img
                                          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                                      }
                                    </div>
                                    {status &&
                                    <div className={'alert alert-danger'}>{status}</div>
                                    }
                                  </div>
                                </Col>
                              </Row>

                            </Form>
                        )}
                    />
                  </Container>

                  <CardBody>

                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
    );
  }
};

export default Profile;