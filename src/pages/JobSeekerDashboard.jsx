import React, { useEffect, useState } from 'react';
import API from '../services/api.js';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';

export default function JobSeekerDashboard() {
  const [me, setMe] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Helper to safely parse skills
  const parseSkills = (skills) => {
    if (Array.isArray(skills)) return skills;
    if (typeof skills === 'string') return skills.split(',').map(s => s.trim()).filter(Boolean);
    return [];
  };

  const load = async () => { setMe(await API.get('/users/me')); };
  const fetchRec = async () => { setRecommended(await API.get('/ai/recommend-jobs')); };

  const uploadResume = async () => {
    setStatus('');
    setError('');
    if (!file) { setError('Please choose a file first.'); return; }
    setLoading(true);
    try {
      await API.upload('/users/me/resume', 'resume', file);
      await API.upload('/ai/parse-resume', 'resume', file);
      await load();
      await fetchRec();
      setStatus('Resume uploaded and parsed successfully.');
    } catch (e) {
      setError(e?.message || 'Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Job Seeker Dashboard</h2>
        <p className="text-sm text-gray-600">Manage your profile, resume, and recommendations</p>
      </div>

      {me && (
        <Card header="Profile" className="motion-safe:animate-fade-in">
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div><span className="text-gray-600">Name:</span> {me.name}</div>
            <div><span className="text-gray-600">Email:</span> {me.email}</div>
            <div>
              <span className="text-gray-600">Resume:</span> {me.resumePath ? <a className="text-primary-700 hover:underline" href={me.resumePath} target="_blank">View</a> : 'Not uploaded'}
            </div>
            <div className="sm:col-span-3">
              <span className="text-gray-600">Skills (AI):</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {parseSkills(me.parsedProfile?.skills).map((s, i) => (
                  <Badge key={i} variant="primary">{s}</Badge>
                ))}
                {parseSkills(me.parsedProfile?.skills).length === 0 && <span className="text-sm text-gray-600">N/A</span>}
              </div>
            </div>
          </div>
        </Card>
      )}

      <Card header="Resume & AI Parsing" className="motion-safe:animate-fade-in" actions={<Button onClick={fetchRec} variant="secondary">Refresh Recommendations</Button>}>
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <input className="input" type="file" onChange={(e) => setFile(e.target.files[0])} />
          <Button onClick={uploadResume} className="btn-gradient" disabled={loading}>{loading ? 'Uploading…' : 'Upload & Parse'}</Button>
        </div>
        {status && <div className="mt-3 rounded-lg bg-green-50 text-green-800 border border-green-200 px-3 py-2 text-sm">{status}</div>}
        {error && <div className="mt-3 rounded-lg bg-red-50 text-red-800 border border-red-200 px-3 py-2 text-sm">{error}</div>}
      </Card>

      <Card header="Recommended Jobs" className="motion-safe:animate-fade-in">
        <div className="grid gap-3">
          {recommended.map((j) => (
            <div key={j.id} className="border border-gray-200 rounded-lg p-4">
              <div className="font-semibold">{j.title}</div>
              <div className="text-sm text-gray-600">{j.location || 'Anywhere'} • {j.jobType || 'N/A'}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {parseSkills(j.requiredSkills).slice(0, 8).map((s, i) => (<Badge key={i} variant="primary">{s}</Badge>))}
                {parseSkills(j.requiredSkills).length === 0 && <span className="text-sm text-gray-600">No skills listed</span>}
              </div>
            </div>
          ))}
          {recommended.length === 0 && <div className="text-sm text-gray-600">No recommendations yet. Upload your resume to get tailored matches.</div>}
        </div>
      </Card>
    </div>
  );
}
