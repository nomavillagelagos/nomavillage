// Test the production API endpoint at nomavillage.com
const testProductionEndpoint = async () => {
  console.log('Testing GET request to check if endpoint exists...');
  
  try {
    // Test GET request first
    const getResponse = await fetch('https://nomavillage.com/api/webhook/email');
    console.log('GET Response status:', getResponse.status);
    
    if (getResponse.ok) {
      const getResult = await getResponse.text();
      console.log('GET Response:', getResult);
    } else {
      console.log('GET failed with status:', getResponse.status);
    }
  } catch (error) {
    console.error('GET request failed:', error.message);
  }

  console.log('\nTesting POST request with sample data...');
  
  const testData = {
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    source: 'test',
    metadata: {
      formType: 'detailed',
      timestamp: new Date().toISOString()
    }
  };

  try {
    const postResponse = await fetch('https://nomavillage.com/api/webhook/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('POST Response status:', postResponse.status);
    console.log('POST Response headers:', Object.fromEntries(postResponse.headers.entries()));
    
    const postResult = await postResponse.text();
    console.log('POST Response body:', postResult);

    if (postResponse.ok) {
      console.log('✅ API endpoint is working on production');
    } else {
      console.log('❌ API endpoint failed on production');
    }

  } catch (error) {
    console.error('❌ POST request failed:', error.message);
  }
};

testProductionEndpoint();
