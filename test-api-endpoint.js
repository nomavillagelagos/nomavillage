// Test the API endpoint directly to troubleshoot Brevo integration
const testApiEndpoint = async () => {
  const testData = {
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    source: 'newsletter',
    metadata: {
      formType: 'detailed',
      timestamp: new Date().toISOString()
    }
  };

  try {
    console.log('Testing API endpoint with data:', testData);
    
    const response = await fetch('https://nomavillage-7antv41d4-nomas-projects-e3fe0a52.vercel.app/api/webhook/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('Response body:', responseText);

    if (response.ok) {
      console.log('✅ API endpoint is working');
    } else {
      console.log('❌ API endpoint failed');
    }

  } catch (error) {
    console.error('❌ Network error:', error);
  }
};

testApiEndpoint();
