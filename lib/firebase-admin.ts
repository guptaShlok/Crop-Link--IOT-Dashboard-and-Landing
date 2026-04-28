import admin from 'firebase-admin';

const serviceAccount = {
  type: "service_account",
  project_id: "crop-link-c2a70",
  private_key_id: "bdb25d72d22319b03ac686ad9e7da91751ca6689",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7FM8hYXOizMWE\nkNcNC3R26D0I68e/wWTTLWq9iAcJL9sNmUy6mYz1Q+IKDqCsgf8WRU21+ZS6CbwO\nqHf1Xgj7I1KniLD3sK4VsNMTdD2kO/kTc0q1xIU2z38sZHgMnbG2wwa1DJIttBou\n1V0tSbCR7wLVrQ/UNE5nb8bNeap2oqTW7rpBDHCrGMSasaHVR29y9O9e8j5C6u+g\nf1Yls9r685gjBc8Y0XiBFerYItbSy6nNCrjC279+0Kj0LjYX7eqMP7dbBTWQ8Gds\ni9P7cYdxYLwfcvaGec4AR75Jh6JVk0zTxdF9QaocsJCGGs+BNd7wBFT0yq4vyKyq\ncKpyy0ZLAgMBAAECggEASraTxhQCN2kqFLg3ejkx6O70uSRYoKcemgvQTiMOFEgt\nZm/rqbX7ClRy6GtRFbPQ6NcCowMqt2V92ijDx5UnZwyDTO8VJcZEr9rvYRySJY3h\n+jeYBaGXRf12H4d8PiWYPJIEkreThXcg4cVKMfT09EMM0cMMyEWfbkXAknzdbAT2\nXGHgaHQG3bPWyOX8Eiit0l5uunhDul1gmXtwknUmVs68+4sdZ5FxUnhaJDMiGxvF\nn6RgFUmcXjkTx1zopox4ubMqPfi6KQgfeHn59c5sWy+aODEir++fTo89NWEEUGrB\nYOebO7csfepKynRSF5FvrU2B6eRNJ5NW9eoEaTm7kQKBgQD2rRd21qE8Kjp1s1qO\nXMEQuGXaFmjXNEhlS3PtVMhZNS/yPGmRe+Wh4vIe2I+/QGxmVOUT3wV2T0PkQ9a4\niy8Aim8yde5xcbLfAvWq3K1cnSak8MD39mPwsjE4QUFp5jqmBG4rznq7KM8aFs0k\nWG7+S3OaKebnQS4GSDyRyO3bKQKBgQDCJw+LsdD72qRXP97x+qAYLWpiM+ERgXk0\ntcdrsVbvNp4UvLePSbwWljhozZcyd6RDCO+vQt95Qub6qA9sYSj8tPI3KdIhixzv\n+nWdXs8Z19YnQ7YahrZND9D7fzg/DW/kt7iijLSkCd7koX0uAHRBIDnDl3LxMn/d\nNryUB6J4UwKBgQDiBvrQHpyA96S3gs9AUUdq3bweGJiaUMLhZkDkP+KQs0aqrKaC\n80cXjk8S6pbUxOBO6A07pwhnPvxTpcGTOZ2o3jBDyYHiGy+uXxTiKfEEQs9NJXl7\n/B3ZSD4HcOvScG5e/wJAS6Nz6VHTcv8oBYw2oMZdhXWZgsT8ZqZxYu5n+QKBgQC2\nK1hWxr1D0t6oTvGtMm/Mv7A1/F+NwWIspvM6hOcBBMpGwtuowpKMzt6W13Cqlb+2\ndkgOtjxg1vlK7y2pj3CZzF4IjGDxwEmikeqRgkfoA7CYntva/9NFczWvBKuN3dnD\nTO8c9dD4qZpOA4glBaAPC2GnuA7NaYi304gVjSRQqQKBgG+oT+AsC/O4ySprP5v2\nZi7DR4fPJX9UnOy8i9T3UA/pHBrm342pveUNYT3vBcdYY0AIxnD91L+AfN6KT/7n\n3JT7wEb9IkOGqXO1gYbsbDDaEqOoRKkuajVJiBdpKnPBqzq8nAOpjS9FaTIBLqq2\n9vV1xHpvvu8fTjtfpGuFqoD7\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@crop-link-c2a70.iam.gserviceaccount.com",
  client_id: "111639570907759365066",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40crop-link-c2a70.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
} as any;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://crop-link-c2a70-default-rtdb.asia-southeast1.firebasedatabase.app"
  });
}

export const adminAuth = admin.auth();
export const adminDb = admin.database();

export default admin;
