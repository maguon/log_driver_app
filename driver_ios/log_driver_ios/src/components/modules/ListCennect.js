import React, { Component } from 'react'
import { connect } from 'react-redux'

const ListCennect = props => {
    const { mapStateToProps, mapDispatchToProps, List, onSelect } = props
    const SelectListComponent = connect(mapStateToProps, mapDispatchToProps)(List)
    return (
        <SelectListComponent onSelect={onSelect} />
    )
}
export default ListCennect