import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LinkCard } from '../components/LinkCard';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/httpHook';

export const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);
  const linkId = useParams().id;

  useEffect(() => {
    (async () => {
      try {
        const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
          Authorization: `Bearer ${token}`,
        });
        setLink(fetched);
      } catch (error) {}
    })();
  }, [request, linkId, token]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && link && <LinkCard link={link} />}</>;
};
