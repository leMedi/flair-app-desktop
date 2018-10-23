import React from 'react';
import { Input } from 'antd';





class ContactSearch extends React.Component {

    render(){
        const Search = Input.Search;
        return (

            <Search
            placeholder="input search text"
            // onSearch={value => console.log(value)}
            style={{ width: 200 }}
            onChange={this.props.onSearchInputChange}
            value={this.props.value}
            />

        );
    }

    


}

export default ContactSearch;