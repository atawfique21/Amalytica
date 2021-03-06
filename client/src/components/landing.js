import React from 'react'
import amalytics2 from '../assets/amalytics2.mp4'
import cloud from '../assets/cloud.png'
import fast from '../assets/fast.png'
import select from '../assets/select.png'

export default function Landing() {
  return (
    <div>
      <div className="Heading">
        <h1>The World Revolves Around Data</h1>
        <div className="browser-mockup">
          <video autoPlay loop muted width="100%" height="50%">
            <source src={amalytics2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <h2>And Amalytica harness the power of modern tech to harvest data for Amazon Sellers.</h2>
      </div>
      <div className="Features">
        <div className="single-feature">
          <img src={fast}></img>
          <h3>Lightning Fast Analytics</h3>
          <h4>The average analytics for an ASIN is delivered under one minute.</h4>
        </div>
        <div className="single-feature">
          <img src={select}></img>
          <h3>All ASINs Supported</h3>
          <h4>Amalytica supports all product categories and ASINs.</h4>
        </div>
        <div className="single-feature">
          <img src={cloud}></img>
          <h3>Server-sided Harvesting</h3>
          <h4>Your computer resources are never used to harvest data for Amalytica.</h4>
        </div>
      </div>
    </div>
  )
}