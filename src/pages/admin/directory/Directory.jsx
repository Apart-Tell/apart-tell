import React from 'react';
import './directory.scss';
import Header from '../../../components/admin/header/Header';
import Footer from '../../../components/admin/footer/Footer';
import CRUD from '../../../components/admin/crud/CRUD';

const Directory = () => {
  return (
    <>
    <Header/>
    <CRUD/>
    <Footer/>
    </>
  )
}

export default Directory;