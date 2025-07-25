import { Injectable } from '@angular/core';

/**
 * Service responsible for client-side encryption and decryption of sensitive data.
 * Uses AES-CBC encryption with fixed keys for demonstration purposes.
 * In production, keys should be derived from user credentials or securely exchanged.
 */
@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  // Fixed encryption key and IV for demonstration
  // In production, these should be dynamically generated or derived from user credentials
  private key = new TextEncoder().encode('1234567890123456'); // 16 bytes for AES-128
  private iv = new TextEncoder().encode('6543210987654321'); // 16 bytes

  /**
   * Encrypts a plaintext string using AES-CBC encryption.
   * @param plaintext - The text to encrypt
   * @returns Promise resolving to encrypted data as ArrayBuffer
   */
  async encrypt(plaintext: string): Promise<ArrayBuffer> {
    const algorithm = { name: 'AES-CBC', iv: this.iv };
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      this.key,
      algorithm,
      false,
      ['encrypt']
    );
    
    const data = new TextEncoder().encode(plaintext);
    return await crypto.subtle.encrypt(algorithm, cryptoKey, data);
  }

  /**
   * Decrypts encrypted data back to plaintext string.
   * @param ciphertext - The encrypted data as ArrayBuffer
   * @returns Promise resolving to decrypted plaintext string
   */
  async decrypt(ciphertext: ArrayBuffer): Promise<string> {
    const algorithm = { name: 'AES-CBC', iv: this.iv };
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      this.key,
      algorithm,
      false,
      ['decrypt']
    );
    
    const decrypted = await crypto.subtle.decrypt(algorithm, cryptoKey, ciphertext);
    return new TextDecoder().decode(decrypted);
  }

  /**
   * Encrypts a numeric ID and returns a base64 string for use in URLs.
   * This method is currently not used but available for future ID obfuscation.
   * @param id - Numeric ID to encrypt
   * @returns Promise resolving to base64-encoded encrypted ID
   */
  async encryptId(id: number): Promise<string> {
    const plaintext = id.toString();
    const encrypted = await this.encrypt(plaintext);
    // Convert ArrayBuffer to base64 for URL use
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  }

  /**
   * Decrypts a base64 string from the URL and returns the numeric ID.
   * This method is currently not used but available for future ID obfuscation.
   * @param encryptedId - Base64-encoded encrypted ID
   * @returns Promise resolving to the original numeric ID
   */
  async decryptId(encryptedId: string): Promise<number> {
    const binary = atob(encryptedId);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decrypted = await this.decrypt(bytes.buffer);
    return parseInt(decrypted, 10);
  }
}
