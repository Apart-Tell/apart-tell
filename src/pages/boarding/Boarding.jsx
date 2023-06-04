import React from 'react';
import './boarding.scss';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Container from '../../components/explore/container/Container';

export default function Boarding() {
  return (
    <>
      <Header />
      <Container isLoaded={true} type="Boarding house" />
      <Footer />
    </>
  );
}
