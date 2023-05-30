import jwt from 'jsonwebtoken'

interface APITokenPayload {
    tokenId: string
}

function generateEmailToken(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString()
}


function generateAuthToken(tokenId: string): string {
    return jwt.sign(tokenId, process.env.JWT_SECRET!)
}

function decodeAuthToken(token: string): APITokenPayload {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as APITokenPayload
    return payload
}


export { generateEmailToken, generateAuthToken, decodeAuthToken }