import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true)
  const [dataSet, setDataSet] = useState([])

  const getDataSet = useCallback(async () => {
    const response = await fetch(url)
    const dataSet = await response.json()
    setDataSet(dataSet)
    setLoading(false)
  }, [url])

  useEffect(() => {
    getDataSet()
  }, [url, getDataSet])

  return {loading, dataSet}
};
