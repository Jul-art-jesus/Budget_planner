async function authenticateUser() {
    if (!window.PublicKeyCredential) {
        alert("Biometric authentication not supported.");
        return;
    }

    try {
        const credential = await navigator.credentials.get({
            publicKey: {
                challenge: new Uint8Array(32), 
                allowCredentials: [],
                timeout: 60000
            }
        });

        if (credential) {
            alert("Biometric authentication successful!");
        } else {
            alert("Biometric authentication failed.");
        }
    } catch (error) {
        alert("Biometric authentication not available or denied.");
    }
}
