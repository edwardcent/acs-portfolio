import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const message = (body?.message ?? '').trim();

  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('GITHUB_TOKEN not set');
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
  }

  const owner = 'edwardcent';
  const repo = 'acs-portfolio';
  const branch = 'main';
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const path = `submissions/${timestamp}.md`;

  const fileContent = [
    `# Portfolio Comment`,
    ``,
    `**Received:** ${now.toUTCString()}`,
    ``,
    `---`,
    ``,
    message,
  ].join('\n');

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify({
        message: `portfolio comment — ${now.toLocaleDateString('en-CA')}`,
        content: Buffer.from(fileContent).toString('base64'),
        branch,
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error('GitHub API error:', response.status, err);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
