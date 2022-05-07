


export const getEvent = (receipt: any, event: string) =>
    receipt.events?.filter((x: any) => x.event == event);

export async function getGalleryAddress(tx: any) {
    const receipt = await tx.wait();
    const event = getEvent(receipt, "GalleryCreated");
    return event[0].args["_galleryAddress"];
}
