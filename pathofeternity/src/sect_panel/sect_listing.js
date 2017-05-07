import React from 'react';
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
import './sect_listing.css'

const SectListingLayout = () => (
  <div className="sect-listing-entry">
    <div className="sect-listing-section">
      <div><h4>Hunters Union</h4></div>
      <div><h4>Wuyi Branch</h4></div>
      <Button>Join Sect</Button>
    </div>
    <div className="sect-listing-section">
      <div><b>Requirements</b></div>
      <div>Essence 3</div>

    </div>
    <div className="sect-listing-section">
      <div><b>Resources</b></div>
      <div>5x Mortal bead</div>
      <div>Low Grade Mortal Weapon></div>
    </div>
    <div className="sect-listing-section">
      <div><b>Foundation Technique</b></div>
      <div className="sect-listing-foundation-tech">
        <div className="sect-listing-foundation-skill">
          Hunter's Legacy
        </div>
      </div>
    </div>
  </div>

)

const SectListing = connect()(SectListingLayout)

export default SectListing
