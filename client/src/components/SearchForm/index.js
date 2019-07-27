import React from "react";
import {Row, Col} from "../Grid"
//import "./style.css";

const SearchForm = props => {
  return (
      <form>
          <Row>
              <label className="BookSearchLabel"><h3>Search For A Book</h3></label>
              <br></br>
              <Col size="11">
                <div className="form-group">
                    <input className="col-12 form-control"
                        value={props.search}
                        type="text"
                        name="searchBook"
                        placeholder="Enter a book title"
                        onChange={props.handleInputChange}
                    />
                </div>
              </Col>
              <Col size="1">
                <button type="submit" className="submitBtn btn btn-primary" onClick={props.handleFormSubmit}>
                    Submit
                </button>
              </Col>
          </Row>
      </form>
  )
}

export default SearchForm
