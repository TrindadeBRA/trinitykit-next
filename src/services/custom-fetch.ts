const customFetch = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    const baseUrl = process.env.WORDPRESS_API_URL;
    const apiKey = process.env.WORDPRESS_API_KEY;

    const fullUrl = baseUrl + url;

    // console.log(">>>>>>>>>>>>>baseUrl", baseUrl);
    // console.log(">>>>>>>>>>>>>url", url);
    // console.log(">>>>>>>>>>>>>apiKey", apiKey);
    // console.log(">>>>>>>>>>>>>fullUrl", fullUrl);

    if (!apiKey) {
      throw new Error('API Key is not defined');
    }
  
    const defaultHeaders = {
    //   'Content-Type': 'application/json',
      'X-API-Key': apiKey,
    };
  
    const requestOptions: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };
  
    try {
      const response = await fetch(fullUrl, requestOptions);
      const data = await response.json();
      
      // console.log("Status da resposta:", response.status);
      // console.log("Headers da resposta:", Object.fromEntries(response.headers));

      // console.log(">>>>>>>>>>>>>response", data);
      
      return data as T;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };
  
  export default customFetch;