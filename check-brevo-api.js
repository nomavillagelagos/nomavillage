// Check Brevo API key and list IDs directly
const checkBrevoAPI = async () => {
  // Test both possible API keys
  const keys = [
    'your-brevo-api-key-here', // JNxmpY
    // Add the r5lB9R key here if you want to test it
  ];
  
  for (const apiKey of keys) {
    console.log(`\n🔑 Testing API Key ending with: ${apiKey.slice(-6)}`);
    
    try {
      // Get all contact lists
      const listsResponse = await fetch('https://api.brevo.com/v3/contacts/lists', {
        headers: {
          'api-key': apiKey
        }
      });
      
      console.log('Response status:', listsResponse.status);
      
      if (!listsResponse.ok) {
        const error = await listsResponse.text();
        console.log('❌ Error:', error);
        continue;
      }
      
      const listsData = await listsResponse.json();
      console.log('✅ API Key is valid!');
      console.log('\n📋 Available Contact Lists:');
      
      if (listsData.lists && listsData.lists.length > 0) {
        listsData.lists.forEach(list => {
          console.log(`- ID: ${list.id} | Name: "${list.name}" | Contacts: ${list.totalSubscribers || 0}`);
        });
      } else {
        console.log('No lists found');
      }
      
    } catch (error) {
      console.error('❌ Network error:', error.message);
    }
  }
};

checkBrevoAPI();
