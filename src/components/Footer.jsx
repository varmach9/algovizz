import React from 'react';
import { CDBModalFooter, CDBListGroupItem, CDBBox, CDBBtn, CDBIcon } from 'cdbreact';

const Footer = () => {
  return (
    <CDBModalFooter className="shadow">
      <CDBBox display="flex" flex="column" className="mx-auto py-5" style={{ width: '90%' }}>
        <CDBBox display="flex" justifyContent="between" className="flex-wrap">
          <CDBBox>
            <a href="/" className="d-flex align-items-center p-0 text-dark">
              <img alt="logo" src="logo" width="30px" />
              <span className="ms-3 h5 font-weight-bold">Devwares</span>
            </a>
            <p className="my-3" style={{ width: '250px' }}>
              We are creating High Quality Resources and tools to Aid developers during the
              developement of their projects
            </p>
            <CDBBox display="flex" className="mt-4">
              <CDBBtn flat color="dark">
                <CDBIcon fab icon="facebook-f" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="mx-3">
                <CDBIcon fab icon="twitter" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="p-2">
                <CDBIcon fab icon="instagram" />
              </CDBBtn>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Devwares
            </p>
            <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
              <CDBListGroupItem href="/">Resources</CDBListGroupItem>
              <CDBListGroupItem href="/">About Us</CDBListGroupItem>
              <CDBListGroupItem href="/">Contact</CDBListGroupItem>
              <CDBListGroupItem href="/">Blog</CDBListGroupItem>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Help
            </p>
            <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
              <CDBListGroupItem href="/">Support</CDBListGroupItem>
              <CDBListGroupItem href="/">Sign Up</CDBListGroupItem>
              <CDBListGroupItem href="/">Sign In</CDBListGroupItem>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Products
            </p>
            <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
              <CDBListGroupItem href="/">Windframe</CDBListGroupItem>
              <CDBListGroupItem href="/">Loop</CDBListGroupItem>
              <CDBListGroupItem href="/">Contrast</CDBListGroupItem>
            </CDBBox>
          </CDBBox>
        </CDBBox>
        <small className="text-center mt-5">&copy; Chekuri Srinivasa Varma, 2023. All rights reserved.</small>
      </CDBBox>
    </CDBModalFooter>
  );
};


export default Footer