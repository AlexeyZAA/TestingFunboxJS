import React, { Component } from 'react';

const Myfullname = ({ firstName, lastName }) => (
<div class="myfooter">
    Автор: <h3> { firstName } { lastName } </h3>.
</div>
);

export default Myfullname;