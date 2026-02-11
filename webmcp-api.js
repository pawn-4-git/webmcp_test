/**
 * WebMCP API Implementation for Product Reviews
 */

(function () {
    // optimize: Initialize Mock WebMCP Environment if not present
    if (!window.navigator.modelContext) {
        console.log('WebMCP: Initializing Mock Environment');
        window.navigator.modelContext = {
            toolMap: {}, // Use a plain object for compatibility
            registerTool: function (tool) {
                console.log(`WebMCP: Registering tool '${tool.name}'`);
                this.toolMap[tool.name] = tool;
            },
            unregisterTool: function (name) {
                console.log(`WebMCP: Unregistering tool '${name}'`);
                delete this.toolMap[name];
            },
            provideContext: function (tools) {
                console.log(`WebMCP: Providing context with ${tools.length} tools`);
                this.toolMap = {};
                tools.forEach(tool => this.registerTool(tool));
            },
            clearContext: function () {
                console.log('WebMCP: Clearing context');
                this.toolMap = {};
            }
        };
    }

    // Define the tool for extracting reviews
    const getProductReviewsTool = {
        name: "getProductReviews",
        description: "Retrieve customer names, ratings, dates, and review comments from the product page.",
        inputSchema: {
            type: "object",
            properties: {
                limit: {
                    type: "integer",
                    description: "The maximum number of reviews to return. Optional."
                }
            }
        },
        outputSchema: {
            type: "object",
            properties: {
                content: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            type: { type: "string" },
                            text: { type: "string" }
                        }
                    }
                }
            }
        },
        execute: async function (params) {
            console.log("WebMCP: Executing getProductReviews", params);

            try {
                const reviews = [];
                const reviewCards = document.querySelectorAll('.review-card');

                let count = 0;
                const limit = params && params.limit ? params.limit : Number.MAX_SAFE_INTEGER;

                for (const card of reviewCards) {
                    if (count >= limit) break;

                    const name = card.querySelector('.reviewer-name')?.innerText?.trim();
                    const date = card.querySelector('.review-date')?.innerText?.trim();
                    const ratingText = card.querySelector('.review-rating')?.innerText?.trim();
                    // Convert stars "★★★★★" to number if needed, or keep as string
                    const rating = ratingText ? ratingText.length : 0;
                    const content = card.querySelector('.review-content')?.innerText?.trim();
                    const id = card.getAttribute('data-review-id');

                    if (name && content) {
                        reviews.push({
                            id,
                            reviewerName: name,
                            reviewDate: date,
                            rating: ratingText,     // "★★★★★"
                            ratingValue: rating,    // 5
                            comment: content
                        });
                    }
                    count++;
                }

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(reviews, null, 2)
                        }
                    ]
                };

            } catch (error) {
                console.error("WebMCP: Error extracting reviews", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({ error: "Failed to extract reviews", details: error.message })
                        }
                    ]
                };
            }
        }
    };

    // Register the tool
    if (window.navigator.modelContext) {
        window.navigator.modelContext.registerTool(getProductReviewsTool);
    }

})();
