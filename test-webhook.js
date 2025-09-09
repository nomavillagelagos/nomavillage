// Test script to verify Zapier webhook integration
const testWebhook = async () => {
  const webhookUrl = 'https://hooks.zapier.com/hooks/catch/13042322/udqwdo8/';
  
  // Test data for newsletter signup
  const newsletterData = {
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    source: 'newsletter',
    timestamp: new Date().toISOString(),
    metadata: {
      formType: 'detailed',
      userAgent: 'Test Script',
      ip: '127.0.0.1'
    }
  };

  // Test data for guide modal
  const guideData = {
    email: 'guide-test@example.com',
    source: 'guide-modal',
    timestamp: new Date().toISOString(),
    metadata: {
      formType: 'guide-request',
      requestType: 'lagos-algarve-guide',
      userAgent: 'Test Script',
      ip: '127.0.0.1'
    }
  };

  try {
    console.log('Testing newsletter signup webhook...');
    const newsletterResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newsletterData)
    });
    
    console.log('Newsletter test status:', newsletterResponse.status);
    console.log('Newsletter test response:', await newsletterResponse.text());

    console.log('\nTesting guide modal webhook...');
    const guideResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(guideData)
    });
    
    console.log('Guide test status:', guideResponse.status);
    console.log('Guide test response:', await guideResponse.text());

  } catch (error) {
    console.error('Webhook test failed:', error);
  }
};

testWebhook();
