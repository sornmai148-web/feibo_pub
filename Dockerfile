# 1. Use official Node.js image (use LTS version)
FROM node:20-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 4. Copy the rest of the code
COPY . .

# 5. Build the Next.js app
RUN yarn build

# 6. Use minimal image for production
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Optional: enable faster startup with next
ENV NEXT_TELEMETRY_DISABLED=1

# Copy only necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port (default is 3000)
EXPOSE 3000

# Run the Next.js app
CMD ["yarn", "start"]