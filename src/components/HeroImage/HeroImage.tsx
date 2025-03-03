import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function HeroImage() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas dimensions
        const setCanvasDimensions = () => {
            canvas.width = canvas.clientWidth * window.devicePixelRatio
            canvas.height = canvas.clientHeight * window.devicePixelRatio
        }

        setCanvasDimensions()
        window.addEventListener("resize", setCanvasDimensions)

        // Node class for network visualization
        class Node {
            x: number
            y: number
            size: number
            color: string
            speed: number
            angle: number

            constructor(x: number, y: number) {
                this.x = x
                this.y = y
                this.size = Math.random() * 3 + 2
                this.color = `rgba(149, 76, 233, ${Math.random() * 0.5 + 0.3})`
                this.speed = Math.random() * 0.5 + 0.2
                this.angle = Math.random() * Math.PI * 2
            }

            update(width: number, height: number) {
                this.x += Math.cos(this.angle) * this.speed
                this.y += Math.sin(this.angle) * this.speed

                // Bounce off edges
                if (this.x < 0 || this.x > width) {
                    this.angle = Math.PI - this.angle
                }
                if (this.y < 0 || this.y > height) {
                    this.angle = -this.angle
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = this.color
                ctx.fill()
            }
        }

        // Create nodes
        const nodeCount = 50
        const nodes: Node[] = []

        for (let i = 0; i < nodeCount; i++) {
            const x = Math.random() * canvas.width
            const y = Math.random() * canvas.height
            nodes.push(new Node(x, y))
        }

        // Draw connections between nodes
        const drawConnections = (ctx: CanvasRenderingContext2D, nodes: Node[]) => {
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x
                    const dy = nodes[i].y - nodes[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 100) {
                        ctx.beginPath()
                        ctx.moveTo(nodes[i].x, nodes[i].y)
                        ctx.lineTo(nodes[j].x, nodes[j].y)
                        ctx.strokeStyle = `rgba(149, 76, 233, ${0.1 * (1 - distance / 100)})`
                        ctx.lineWidth = 1
                        ctx.stroke()
                    }
                }
            }
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update and draw nodes
            nodes.forEach((node) => {
                node.update(canvas.width, canvas.height)
                node.draw(ctx)
            })

            // Draw connections
            drawConnections(ctx, nodes)

            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", setCanvasDimensions)
        }
    }, [])

    return (
        <div className="relative w-full h-[500px] rounded-xl overflow-hidden border border-primary/20 shadow-xl">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/50 to-primary/10 z-10"
            />
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="bg-background/80 backdrop-blur-md p-6 rounded-xl border border-primary/30 shadow-lg max-w-md"
                >
                    <div className="flex items-center justify-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary"
                            >
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                <circle cx="12" cy="16" r="1" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-center mb-2">Anonymous. Private.</h3>
                    <p className="text-center text-muted-foreground">
                        Your identity remains hidden while you connect, communicate, and collaborate with your network.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

