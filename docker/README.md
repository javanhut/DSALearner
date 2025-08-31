# DSA Lab Docker Setup

This Docker setup provides full C++ and Python compilation support for the DSA Lab.

## Features

- **Full C++ Support**: Complete C++17 compiler with STL
- **Python Support**: Python 3 with numpy, scipy, pandas
- **JavaScript Support**: Node.js runtime
- **Secure Execution**: Isolated container environment
- **Resource Limits**: Memory and CPU limits to prevent abuse

## Quick Start

### Using Docker Compose (Recommended)

1. Navigate to the docker directory:
```bash
cd docker
```

2. Build and start the container:
```bash
docker-compose up -d
```

3. Check if it's running:
```bash
curl http://localhost:3000/health
```

### Manual Docker Build

1. Build the image:
```bash
docker build -t dsa-lab .
```

2. Run the container:
```bash
docker run -d -p 3000:3000 --name dsa-lab-server dsa-lab
```

## Configuration

### Update lab-wasm.js to use Docker

To use the Docker server instead of WASM, update the executor in `lab.js`:

```javascript
import { DockerExecutor } from './lab-wasm.js';

// Use Docker executor
const executor = new DockerExecutor('http://localhost:3000');
```

### Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (production/development)

## API Endpoints

### POST /execute
Execute code in specified language.

**Request:**
```json
{
  "language": "cpp|python|javascript",
  "code": "// your code here",
  "functionName": "solve",
  "args": [arg1, arg2, ...]
}
```

**Response:**
```json
{
  "result": "function return value",
  "output": "stdout output"
}
```

### GET /health
Check server status.

## Security Considerations

- Code execution is time-limited (5 seconds)
- Memory usage is limited (512MB)
- CPU usage is limited (50%)
- Temporary files are cleaned up after execution
- Network access can be disabled if needed

## Troubleshooting

### Container won't start
- Check if port 3000 is available
- Ensure Docker daemon is running
- Check logs: `docker-compose logs`

### Compilation errors
- Verify the code syntax
- Check language-specific requirements
- Review server logs for details

### Performance issues
- Increase memory limit in docker-compose.yml
- Adjust CPU allocation
- Consider using multiple container instances

## Development

To develop locally without Docker:

1. Install dependencies:
```bash
npm install
apt-get install g++ python3 python3-pip
```

2. Run the server:
```bash
node server.js
```

## Production Deployment

For production use:

1. Use HTTPS with reverse proxy (nginx/traefik)
2. Add authentication/rate limiting
3. Monitor resource usage
4. Set up logging and alerts
5. Use container orchestration (Kubernetes)

## License

MIT