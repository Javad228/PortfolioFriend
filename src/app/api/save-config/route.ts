import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0'
import { Octokit } from '@octokit/rest'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get the config data from request
    const configData = await request.json()

    // Initialize Octokit with GitHub token
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    })

    const owner = process.env.GITHUB_OWNER
    const repo = process.env.GITHUB_REPO
    const path = 'public/portfolio-config.json'

    if (!owner || !repo) {
      return NextResponse.json({ error: 'GitHub configuration missing' }, { status: 500 })
    }

    // Get current file to get its SHA
    let sha: string | undefined
    try {
      const { data: currentFile } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path,
      })
      
      if ('sha' in currentFile) {
        sha = currentFile.sha
      }
    } catch (error) {
      // File doesn't exist yet, that's okay
      console.log('File does not exist yet, will create new file')
    }

    // Update or create the file
    const response = await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `Update portfolio configuration via admin panel`,
      content: Buffer.from(JSON.stringify(configData, null, 2)).toString('base64'),
      sha,
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Configuration saved successfully',
      commit: response.data.commit.sha 
    })

  } catch (error) {
    console.error('Error saving config:', error)
    return NextResponse.json({ 
      error: 'Failed to save configuration',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
