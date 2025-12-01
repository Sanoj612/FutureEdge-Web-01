const API = {
  base: '/api',
  token() { return localStorage.getItem('fe_token'); },
  headers() {
    const h = { 'Content-Type': 'application/json' };
    const t = this.token();
    if (t) h['Authorization'] = `Bearer ${t}`;
    return h;
  },
  async get(path) { const r = await fetch(this.base + path, { headers: this.headers() }); return r.json(); },
  async post(path, body) { const r = await fetch(this.base + path, { method: 'POST', headers: this.headers(), body: JSON.stringify(body) }); return r.json(); },
  async put(path, body) { const r = await fetch(this.base + path, { method: 'PUT', headers: this.headers(), body: JSON.stringify(body) }); return r.json(); },
  async del(path) { const r = await fetch(this.base + path, { method: 'DELETE', headers: this.headers() }); return r.json(); },
  async upload(path, fileField, file) {
    const fd = new FormData();
    fd.append(fileField, file);
    const r = await fetch(this.base + path, { method: 'POST', headers: { Authorization: `Bearer ${this.token()}` }, body: fd });
    let data = null;
    try { data = await r.json(); } catch {}
    if (!r.ok) {
      const msg = data?.message || 'Upload failed';
      throw new Error(msg);
    }
    return data;
  }
};
export default API;
