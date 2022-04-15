import React, { useContext, useState } from 'react';
import { useHttp } from '../hooks/httpHook';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const CreatePage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [link, setLink] = useState('');
  const { request } = useHttp();

  const keyHandler = async (event) => {
    if (event.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          { from: link },
          { Authorization: `Bearer ${auth.token}` }
        );
        console.log(data);
        navigate(`/detail/${data.link._id}`);
      } catch (error) {}
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input
            type="text"
            id="link"
            value={link}
            onChange={(event) => setLink(event.target.value)}
            onKeyDown={keyHandler}
          />
          <label htmlFor="link">Enter your link</label>
        </div>
      </div>
    </div>
  );
};
