// Check Brevo API key and list IDs
const checkBrevoConfig = async () => {
  // This will use the API key from your .env.local (the r5lB9R one)
  const apiKey = process.env.BREVO_API_KEY;
  
  if (!apiKey) {
    console.log('❌ No BREVO_API_KEY found in environment');
    return;
  }
  
  console.log('🔑 API Key ending:', apiKey.slice(-6));
  
  try {
    // Get all contact lists
    console.log('\n📋 Fetching contact lists...');
    const listsResponse = await fetch('https://api.brevo.com/v3/contacts/lists', {
      headers: {
        'api-key': apiKey
      }
    });
    
    if (!listsResponse.ok) {
      console.log('❌ Failed to fetch lists:', listsResponse.status);
      const error = await listsResponse.text();
      console.log('Error:', error);
      return;
    }
    
    const listsData = await listsResponse.json();
    console.log('\n📋 Available Contact Lists:');
    
    if (listsData.lists && listsData.lists.length > 0) {
      listsData.lists.forEach(list => {
        console.log(`- ID: ${list.id} | Name: "${list.name}" | Contacts: ${list.totalSubscribers || 0}`);
      });
    } else {
      console.log('No lists found');
    }
    
    // Check current configuration
    console.log('\n⚙️ Current Configuration:');
    console.log('BREVO_DEFAULT_LIST_ID:', process.env.BREVO_DEFAULT_LIST_ID || 'Not set');
    console.log('BREVO_GUIDE_LIST_ID:', process.env.BREVO_GUIDE_LIST_ID || 'Not set');
    
  } catch (error) {
    console.error('❌ Error checking Brevo config:', error.message);
  }
};

checkBrevoConfig();
