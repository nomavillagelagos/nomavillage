// Test script to verify direct Brevo CRM integration
const testBrevoIntegration = async () => {
  const brevoApiKey = 'your-brevo-api-key-here';
  const listId = 5;
  
  // Test data for newsletter signup
  const newsletterContact = {
    email: 'test-newsletter@example.com',
    attributes: {
      FIRSTNAME: 'John',
      LASTNAME: 'Doe',
      SOURCE: 'newsletter',
      SIGNUP_DATE: new Date().toISOString(),
      FORM_TYPE: 'detailed'
    },
    listIds: [listId]
  };

  // Test data for guide modal
  const guideContact = {
    email: 'test-guide@example.com',
    attributes: {
      SOURCE: 'guide-modal',
      SIGNUP_DATE: new Date().toISOString(),
      FORM_TYPE: 'guide-request'
    },
    listIds: [listId]
  };

  try {
    console.log('Testing newsletter signup contact creation...');
    const newsletterResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': brevoApiKey
      },
      body: JSON.stringify(newsletterContact)
    });
    
    console.log('Newsletter test status:', newsletterResponse.status);
    const newsletterResult = await newsletterResponse.json();
    console.log('Newsletter test response:', newsletterResult);

    console.log('\nTesting guide modal contact creation...');
    const guideResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': brevoApiKey
      },
      body: JSON.stringify(guideContact)
    });
    
    console.log('Guide test status:', guideResponse.status);
    const guideResult = await guideResponse.json();
    console.log('Guide test response:', guideResult);

  } catch (error) {
    console.error('Brevo integration test failed:', error);
  }
};

testBrevoIntegration();
