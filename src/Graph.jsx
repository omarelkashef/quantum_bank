// Graph.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Graph = ({ players, uncertainty }) => {
const data = [
    { name: 'Player 1', uncertainty: players[0] },
    { name: 'Player 2', uncertainty: players[1] },
    { name: 'Total', uncertainty }
    ];

  return (
    <div style={{ width: '80%', height: 400, margin: 'auto' }}>
      <ResponsiveContainer>
        <BarChart
          data={data.map(item => ({...item, uncertainty: Math.log2(item['uncertainty'])}))}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}   
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value, name, props) => Math.pow(2, value).toFixed(0)}/>
          <Legend />
          <Bar dataKey="uncertainty" fill="#8884d8"> </Bar>
          
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
