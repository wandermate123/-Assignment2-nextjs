import { NextRequest, NextResponse } from 'next/server'

interface GitCommand {
  id: string
  command: string
  description: string
  createdAt: string
}

export async function POST(request: NextRequest) {
  try {
    const { commands, databaseType } = await request.json()

    if (!commands || !Array.isArray(commands)) {
      return NextResponse.json(
        { error: 'Commands array is required' },
        { status: 400 }
      )
    }

    if (!databaseType || !['prisma', 'sequelize'].includes(databaseType)) {
      return NextResponse.json(
        { error: 'Valid database type (prisma or sequelize) is required' },
        { status: 400 }
      )
    }

    // Simulate database save operation
    console.log(`Saving ${commands.length} commands to ${databaseType} database`)

    // In a real implementation, you would:
    // 1. Connect to the database using Prisma or Sequelize
    // 2. Save the commands to the database
    // 3. Return the saved records

    const savedCommands = commands.map((cmd: GitCommand) => ({
      ...cmd,
      id: `db_${cmd.id}`,
      savedAt: new Date().toISOString(),
      databaseType
    }))

    // Simulate database response
    const response = {
      success: true,
      savedCommands,
      totalSaved: savedCommands.length,
      databaseType,
      message: `Successfully saved ${savedCommands.length} commands to ${databaseType} database`
    }

    console.log('Database save completed:', response)

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error saving to database:', error)
    return NextResponse.json(
      { error: 'Failed to save commands to database' },
      { status: 500 }
    )
  }
}
